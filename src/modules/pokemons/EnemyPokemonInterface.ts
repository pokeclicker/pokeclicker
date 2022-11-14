import { Observable } from 'knockout';
import PokemonInterface from '../interfaces/Pokemon';
import Amount from '../wallet/Amount';

export default interface EnemyPokemonInterface extends PokemonInterface {
    health: number | Observable<number>;
    maxHealth: number | Observable<number>;
    level: number;
    catchRate: number;
    exp: number;
    reward: Amount,

    isAlive(): boolean;
    damage(damage: number): void;
}
