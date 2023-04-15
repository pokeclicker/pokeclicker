import { DailyDeal } from './DailyDeal';

describe('DailyDeal', () => {
    // Use `npm run vitest -- -u` to automatically update the snapshot
    it('generates the same deals as last build', () => {
        const testDateDeals = (date: Date) => {
            DailyDeal.generateDeals(10, date);
            expect(DailyDeal.list().map(deal => ({
                ...deal,
                // Just pulling out the item names for smaller snapshot
                item1: deal.item1.displayName,
                item2: deal.item2.displayName,
            }))).toMatchSnapshot(date.toISOString().split('T')[0]);
        };

        testDateDeals(new Date(2023, 0, 1));
        testDateDeals(new Date(2023, 4, 1));
        testDateDeals(new Date(2023, 8, 1));
    });
});
