const { stdin, stdout } = Deno;

class EasyIOContext {
    constructor(private data: string) {}

    public toWrite(
        prefix?: string | null,
        suffix?: string | null
    ): EasyIOContext {
        if (prefix) {
            this.data = prefix + this.data;
        }

        if (suffix) {
            this.data = this.data + suffix;
        }

        EasyIO.write(this.data);
        return this;
    }

    public toReturn() {
        return this.data;
    }

    public tryAgain() {
        return new EasyIOContext(EasyIO.readline(this.data.length).toReturn());
    }
}

const EasyIO = {
    readline(bufSize: number) {
        const buf = new Uint8Array(bufSize);
        const n = stdin.readSync(buf);
        if (n != null) {
            return new EasyIOContext(new TextDecoder().decode(buf));
        }
        return new EasyIOContext("");
    },

    write(str: string) {
        stdout.writeSync(new TextEncoder().encode(str));
    },
};

export default EasyIO;
