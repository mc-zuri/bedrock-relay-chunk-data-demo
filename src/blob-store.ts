export class BlobStore extends Map {
    pending: any = {};
    wanted: any[] = [];

    set(key: any, value: any) {
        const ret = super.set(key.toString(), value);
        this.wanted.forEach(
            (wanted) =>
            (wanted[0] = wanted[0].filter(
                (hash: any) => hash.toString() !== key.toString()
            ))
        );
        for (const i in this.wanted) {
            const [outstandingBlobs, cb] = this.wanted[i];
            if (!outstandingBlobs.length) {
                cb();
                delete this.wanted[i];
            }
        }
        return ret;
    }

    get(key: any) {
        return super.get(key.toString());
    }

    has(key: any) {
        return super.has(key.toString());
    }

    addPending(hash: any, blob: any) {
        this.pending[hash.toString()] = blob;
    }

    updatePending(hash: string, value: any) {
        const name = hash.toString();
        if (this.pending[name]) {
            this.set(name, Object.assign(this.pending[name], value));
        } else {
            throw new Error("No pending blob for hash " + name);
        }
    }

    once(wantedBlobs: any, cb: any) {
        const outstanding: any[] = [];
        for (const wanted of wantedBlobs) {
            if (!this.has(wanted)) outstanding.push(wanted);
        }

        if (outstanding.length) {
            this.wanted.push([outstanding, cb]);
        } else {
            cb();
        }
    }
}