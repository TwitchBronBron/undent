import { expect } from 'chai';
import { undent } from './undent';

describe('undent', () => {
    it('leaves fully de-indented text alone', () => {
        expect(
            undent('hello\n\tworld')
        ).to.eql(
            'hello\n\tworld'
        );
    });

    it('retains mixed EOL chars', () => {
        expect(
            undent('hello\nworld\r\nhowdy')
        ).to.eql(
            'hello\nworld\r\nhowdy'
        );
    });

    it('trims leading and trailing newlines and whitespace-only lines', () => {
        expect(
            undent('\t\n hello\n\t\n ')
        ).to.eql(
            'hello'
        );
    });

    it('uses the smallest indent in the entire text', () => {
        expect(
            undent`\t\thello\n\tworld`
        ).to.eql('\thello\nworld');
    });

    it('retains whitespace in the middle', () => {
        expect(
            undent`hello\n\t\nworld`
        ).to.eql('hello\n\t\nworld');
    });

    it('removes trailing newline', () => {
        expect(
            undent`hello\n`
        ).to.eql('hello');
    });

    it('works as a tagged template literal', () => {
        expect(
            undent`

                undent me!

            `
        ).to.eql(
            'undent me!'
        );
    });

    it('works when tagged template literal signature called manually', () => {
        expect(
            undent(['a', 'b'] as any, 'c')
        ).to.eql('acb');
    });

    it('works when tagged template literal signature called manually with bad args', () => {
        expect(
            undent(['a', 'b'] as any)
        ).to.eql('ab');
    });

    it('works for variables in tagged template literals', () => {
        const code = `text`;
        expect(
            undent`${code}-${code}`
        ).to.eql(
            `text-text`
        );
    });

    it('retains consecutive newlines in the middle', () => {
        expect(
            undent(`
                alpha

                beta
            `)
        ).to.eql(
            `alpha\n\nbeta`
        );
    });
});
