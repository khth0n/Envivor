interface CommandHandler {
    exe(data: any, args: string[]): any;
    isActive?: boolean;
}

export default CommandHandler;