import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as knockout from 'knockout';

const gemMasterModal = readFileSync(resolve('src/components/gemMasterModal.html'), 'utf8');
const tradeControlsMarkup = gemMasterModal.match(/<div class="btn-group btn-block"[\s\S]*?<\/div>/)?.[0];

describe('Gem Master trade amount selector', () => {
    it('passes each selected numeric trade amount to the Trade action', () => {
        if (!tradeControlsMarkup) {
            throw new Error('Gem Master trade controls were not found');
        }

        const root = document.createElement('div');
        root.innerHTML = `
            <div class="table-responsive">
                <table>
                    <tbody data-bind="foreach: deals">
                        <tr>
                            <td data-bind="foreach: gems">
                                ${tradeControlsMarkup}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>`;
        document.body.append(root);

        const useTrade = vi.fn();
        const previousGlobals = ['ItemList', 'GemDeals', 'ShopHandler'].map(name => [name, Reflect.get(window, name)] as const);
        Object.assign(window, {
            ItemList: {
                'Deoxys (Clone)': { maxAmount: 2, isSoldOut: () => false },
                OneOnly: { maxAmount: 1, isSoldOut: () => false },
            },
            GemDeals: { canUse: () => true, use: useTrade },
            ShopHandler: { shopObservable: () => ({ shop: 'gem-shop' }) },
        });

        try {
            knockout.applyBindings({
                deals: [{
                    item: { itemType: { name: 'Deoxys (Clone)' } },
                    gems: [{}],
                }, {
                    item: { itemType: { name: 'OneOnly' } },
                    gems: [{}],
                }],
            }, root);

            const selector = root.querySelector('select');
            if (!selector) {
                throw new Error('Gem Master quantity selector was not rendered');
            }
            const oneOnlySelector = root.querySelectorAll('select')[1];
            if (!oneOnlySelector) {
                throw new Error('Single-quantity Gem Master selector was not rendered');
            }
            expect(selector.style.display).not.toBe('none');
            expect(oneOnlySelector.style.display).toBe('none');

            const tradeButton = root.querySelector('button');
            if (!tradeButton) {
                throw new Error('Gem Master Trade button was not rendered');
            }
            const tradeAmount = Reflect.get(knockout.contextFor(selector), 'tradeAmount');
            if (typeof tradeAmount !== 'function') {
                throw new Error('Gem Master trade amount observable was not found');
            }

            const expectedAmounts = [1, 10, 100, 1000, Infinity];
            expect(selector.selectedIndex).toBe(0);
            expect(tradeAmount()).toBe(1);
            expect(typeof tradeAmount()).toBe('number');
            expect(Array.from(selector.options, option => option.text)).toEqual(['1', '10', '100', '1000', 'Infinity']);
            expect(Array.from(selector.options, option => knockout.selectExtensions.readValue(option))).toEqual(expectedAmounts);
            expect(typeof knockout.selectExtensions.readValue(selector.options[4])).toBe('number');

            expectedAmounts.forEach((expectedAmount, index) => {
                selector.selectedIndex = index;
                selector.dispatchEvent(new Event('change', { bubbles: true }));

                expect(tradeAmount()).toBe(expectedAmount);
                expect(typeof tradeAmount()).toBe('number');

                tradeButton.click();

                expect(useTrade).toHaveBeenLastCalledWith('gem-shop', 0, expectedAmount);
            });
        } finally {
            knockout.cleanNode(root);
            root.remove();
            previousGlobals.forEach(([name, value]) => {
                if (value === undefined) {
                    Reflect.deleteProperty(window, name);
                } else {
                    Reflect.set(window, name, value);
                }
            });
        }
    });
});
