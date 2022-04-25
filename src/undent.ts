export function undent(text: string): string;
export function undent(literals: TemplateStringsArray, ...placeholders: any[]): string;
export function undent(...args: any[]) {
    let fullText: string;
    //when called as a tagged template literal
    if (Array.isArray(args[0])) {
        const [literals, ...expressions] = args;
        //merge all text together
        let parts = [];
        for (let i = 0; i < literals.length; i++) {
            parts.push(literals[i], expressions[i] ?? '');
        }
        fullText = parts.join('');

        //when called as a function
    } else {
        fullText = args[0];

    }
    const lines: string[] = [];
    let match: RegExpExecArray | null;
    let nextLineStartIndex = 0;
    let minIndent = Number.MAX_SAFE_INTEGER;

    const regexp = /(\r?\n)/g;
    do {
        match = regexp.exec(fullText);
        let newline = match?.[1] ?? '';

        let line = fullText.substring(nextLineStartIndex, match?.index);

        const trimmedLine = line.trimLeft();
        const leadingSpaceCount = line.length - trimmedLine.length;
        //if this line contains more than whitespace, and it has a smaller indent, that's the new min
        if (trimmedLine && leadingSpaceCount < minIndent) {
            minIndent = leadingSpaceCount;
        }
        lines.push(line + newline);
        if (match) {
            //bump the startIndex for the next loop iteration
            nextLineStartIndex = match.index + match[0].length;
        }
    }
    while (match);

    //skip leading empty lines
    while (lines[0] && lines[0].trim().length === 0) {
        lines.splice(0, 1);
    }
    //skip trailing empty lines
    while (lines[lines.length - 1] && lines[lines.length - 1].trim().length === 0) {
        lines.splice(lines.length - 1, 1);
    }

    //apply the trim to each line
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].substring(minIndent);
    }

    let result = lines.join('');
    //remove the final newline at the end of the last line
    result = result.replace(/\r?\n$/, '');
    return result;
}

