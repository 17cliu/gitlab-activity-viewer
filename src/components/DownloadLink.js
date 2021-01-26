import { useEffect } from 'react';

function DownloadLink({ data }) {
    // Using blobs is MUCH faster than encoding the data directly to a URL:
    // `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`

    const blobConfig = new Blob(
        [JSON.stringify(data)],
        { type: 'text/json;charset=utf-8' }
    );
    const blobUrl = URL.createObjectURL(blobConfig);

    useEffect(() => () => {
        // Revoke URL on component unmount
        URL.revokeObjectURL(blobUrl);
    }, [blobUrl]);

    return (
        <p>
            <a href={blobUrl} download="data.json">Download data as JSON</a>
        </p>
    );
}

export default DownloadLink;
