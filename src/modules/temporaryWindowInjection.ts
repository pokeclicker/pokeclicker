// TODO: Remove temporary code after all code in ../scripts has been ported.
// This is only here so that the code in ../scripts can use the new functionality

import DataStore from './DataStore';

Object.assign(<any>window, {
    DataStore,
    BadgeCase: DataStore.badge,
});
