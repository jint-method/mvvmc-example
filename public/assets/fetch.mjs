import { djinnjsOutDir } from "./config.mjs";
/**
 * Appends resources to the documents head if it hasn't already been loaded.
 * @param filenames - a filename `sting` or an array of `string` CSS filenames or a URL -- exclude the extension
 */
export function fetchCSS(filenames) {
    return new Promise(resolve => {
        const resourceList = filenames instanceof Array ? filenames : [filenames];
        if (resourceList.length === 0) {
            resolve();
        }
        let loaded = 0;
        for (let i = 0; i < resourceList.length; i++) {
            const filename = resourceList[i];
            const isUrl = new RegExp(/^(http)/gi).test(filename);
            let el = document.head.querySelector(`link[file="${filename}"]`) || document.head.querySelector(`link[href="${filename}"]`) || null;
            if (!el) {
                el = document.createElement("link");
                el.rel = "stylesheet";
                if (isUrl) {
                    el.href = `${filename}`;
                }
                else {
                    el.setAttribute("file", `${filename}`);
                    el.href = `${location.origin}/${djinnjsOutDir}/${filename.replace(/(\.css)$/gi, "")}.css`;
                }
                el.addEventListener("load", () => {
                    loaded++;
                    if (loaded === resourceList.length) {
                        resolve();
                    }
                });
                el.addEventListener("error", () => {
                    loaded++;
                    if (loaded === resourceList.length) {
                        resolve();
                    }
                });
                document.head.appendChild(el);
            }
            else {
                loaded++;
                if (loaded === resourceList.length) {
                    resolve();
                }
            }
        }
    });
}