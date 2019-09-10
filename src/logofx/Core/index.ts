import { ObserverLocator } from 'aurelia-binding';
import { Container, BindingEngine } from 'aurelia-framework';

export * from './guid';

export function getDefaultBindingEngine(): BindingEngine {
    return <BindingEngine>Container.instance.get(BindingEngine);
}

export function getDefaultObserverLocator(): ObserverLocator {
    return <ObserverLocator>Container.instance.get(ObserverLocator);
}

declare global {
  interface StringConstructor {
    empty: string;
    isEmptyOrWhitespace(s: string): boolean;
}}

String.empty = ''.toString();

String.isEmptyOrWhitespace = (s: string): boolean => {
  return (s !== undefined && s !== null) && s.trim().length === 0;
};
