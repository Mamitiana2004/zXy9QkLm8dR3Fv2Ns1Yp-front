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
            </body>
        </Html>
    );
}

export default Document;
