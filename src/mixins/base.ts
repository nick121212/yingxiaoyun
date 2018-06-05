import Vue, { VueConstructor } from "vue";

/**
 * 解决Mixin之后，typescript报错的问题
 */
export type VClass<T> = {
    new(): T
} & Pick<VueConstructor, keyof VueConstructor>;
export function Mixins<A>(c: VClass<A>): VClass<A>;
export function Mixins<A, B>(c: VClass<A>, c1: VClass<B>): VClass<A & B>;
export function Mixins<A, B, C>(c: VClass<A>, c1: VClass<B>, c2: VClass<C>): VClass<A & B & C>;
export function Mixins<T>(c: VClass<T>, ...traits: Array<VClass<T>>): VClass<T> {
    return c.extend({
        mixins: traits
    });
}
