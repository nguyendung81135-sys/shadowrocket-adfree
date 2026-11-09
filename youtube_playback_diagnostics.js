
(function () {
  try {
    var url = $request.url || "";
    var path = url.split("?")[0].replace(/^https?:\/\/[^/]+/, "");

    var res = $response || {};
    var headers = res.headers || {};
    var contentType = "unknown";

    for (var key in headers) {
      if (key.toLowerCase() === "content-type") {
        contentType = String(headers[key]);
      }
    }

    var bytes = res.bodyBytes;
    var body = res.body;

    var byteLength = -1;
    var textLength = -1;

    if (bytes != null) {
      if (typeof bytes.byteLength === "number") {
        byteLength = bytes.byteLength;
      } else if (typeof bytes.length === "number") {
        byteLength = bytes.length;
      }
    }

    if (typeof body === "string") {
      textLength = body.length;
    }

    console.log(
      "[YT-DIAG-V2] endpoint=" + path +
      " status=" + (res.status || "unknown") +
      " contentType=" + contentType +
      " byteLength=" + byteLength +
      " textLength=" + textLength
    );

  } catch (error) {
    console.log("[YT-DIAG-V2] error=" + String(error));
  }

  $done({});
})();
