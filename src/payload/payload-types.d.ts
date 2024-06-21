import { CollectionConfig } from 'payload/types';

declare module 'payload/types' {
    export interface CollectionMap {
        Todos: CollectionConfig;
    }
}