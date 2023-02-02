import { SpriteCredits, CodeCredits } from './Credits';

describe('Test Credits', () => {
    it('should have the correct properties', () => {
        [...SpriteCredits, ...CodeCredits].forEach((credit) => {
            expect(credit).toHaveProperty('name');
            expect(credit).toHaveProperty('link');
            expect(credit).toHaveProperty('image');
            expect(credit).toHaveProperty('resources');
        });
    });
});
