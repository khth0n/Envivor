interface CommandHandler {
    execute(data: any, args: string[]): any;
    isActive?: boolean;
}

export default CommandHandler;