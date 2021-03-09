function idParser(referenceString: string): string {
    return referenceString.slice(3, referenceString.length - 1);
}

export default idParser;