import { defineConfig } from 'facteur/dist/lib';

export default defineConfig({
    formatter(commit) {
        let message = commit.message;

        if (/#\d/.test(message)) {
            message = message.replace(/#\d/, title => {
                return `[${title}](https://github.com/fanhaoyuan/config-extracter/pull/${title.slice(1)})`;
            });
        } else {
            message = message += ` ([${commit.hash}](https://github.com/fanhaoyuan/config-extracter/commit/${commit.hash}))`;
        }

        if (commit.type === 'feat') {
            message = `🚀 ${message}`;
        }

        if (commit.type === 'fix') {
            message = `🐛 ${message}`;
        }

        return {
            ...commit,
            message,
        };
    },
});
