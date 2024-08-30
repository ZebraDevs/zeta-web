import type { LitElement } from "lit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T extends LitElement> = new (...args: any[]) => T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AbstractConstructor<T extends LitElement> = abstract new (...args: any[]) => T;