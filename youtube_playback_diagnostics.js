
 // Shadowrocket YouTube playback diagnostics: metadata only, no response modification.
(function () {
  try {
    var url = ($request && $request.url) || '';
    var path = url.split('?')[0].replace(/^https?:\/\/[^/]+/, '');
    var headers = ($response && $response.headers) || {};
    var contentType = '';

    Object.keys(headers).forEach(function (key) {
      if (key.toLowerCase() === 'content-type') {
        contentType = String(headers[key]);
      }
    });

    var body = ($response && $response.body) || '';
    var bodyBytes = ($response && $response.bodyBytes);

    var size = bodyBytes && bodyBytes.byteLength != null
      ? bodyBytes.byteLength
      : (typeof body === 'string' ? body.length : -1);

    console.log(
      '[YT-DIAG] endpoint=' + path +
      ' status=' + (($response && $response.status) || 'unknown') +
      ' contentType=' + contentType +
      ' bodySize=' + size +
      ' bodyAvailable=' + (size > 0)
    );
  } catch (e) {
    console.log('[YT-DIAG] error=' + String(e));
  }

  $done({});
})();
