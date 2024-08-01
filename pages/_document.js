import { Html, Head, Main, NextScript } from 'next/document';

function Document() {
    return (
        <Html>
            <Head>
                <meta name="description" content="Aftrip website"/>
                    <link rel="shortcut icon" href="/images/logo-aftrip.png" type="image/x-icon"/>
            </Head>
            <body>
                <Main />
                <NextScript />
                {/* <script
                    dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                        const noop = () => {};
                        console.log = noop;
                        console.info = noop;
                        console.warn = noop;
                        console.error = noop;
                        console.debug = noop;
                        console.dir = noop;
                        console.dirxml = noop;
                        console.trace = noop;
                        console.assert = noop;
                        console.group = noop;
                        console.groupCollapsed = noop;
                        console.groupEnd = noop;
                        })();
                    `,
                    }}
                /> */}
            </body>
        </Html>
    );
}

export default Document;
