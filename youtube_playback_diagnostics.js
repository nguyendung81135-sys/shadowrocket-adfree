/*
 
YouTube Playback Diagnostics v2
Shadowrocket / iOS
Read-only: does not modify responses.*/

(function () {
  var tag = "[YT-DIAG-V2]";

  function log(message) {
    console.log(tag + " " + message);
  }

  try {
    var url = $request.url  "";
    var endpoint = url.split("?")[0]
      .replace(/^https?://[^/]+/, "");

    var response = $response  {};
    var headers = response.headers  {};

    var contentType = "unknown";

    Object.keys(headers).forEach(function (key) {
      if (key.toLowerCase() === "content-type") {
        contentType = String(headers[key]);
      }
    });

    var body = response.body;
    var bytes = response.bodyBytes;

    var bodyType = typeof body;
    var byteType = bytes
      ? Object.prototype.toString.call(bytes)
      : "unavailable";

    var byteLength = -1;

    if (bytes && typeof bytes.byteLength === "number") {
      byteLength = bytes.byteLength;
    } else if (bytes && typeof bytes.length === "number") {
      byteLength = bytes.length;
    }

    var textLength =
      typeof body === "string" ? body.length : -1;

    log("endpoint=" + endpoint);
    log("status=" + (response.status  "unknown"));
    log("contentType=" + contentType);
    log("bodyType=" + bodyType);
    log("bodyBytesType=" + byteType);
    log("bodyBytesLength=" + byteLength);
    log("bodyTextLength=" + textLength);

    if (byteLength > 0) {
      log("binaryResponseAvailable=true");
    } else if (textLength > 0) {
      log("textResponseAvailable=true");
    } else {
      log("responseBodyUnavailable=true");
    }

  } catch (error) {
    log("error=" + String(error));
  }

  // Preserve the original response.
  $done({});
})();
