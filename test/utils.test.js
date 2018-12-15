const {sortByProperty} = require('../src/utils');

describe('sortByProperty', () => {
    it('should return expected results', () => {
        const input = [{name: 'Foo'}, {name: 'Bar'}, {name: 'Baz'}];
        const res = sortByProperty(x => x.name, input);
        expect(res).toEqual([{name: 'Bar'}, {name: 'Baz'}, {name: 'Foo'}]);
    });
});
