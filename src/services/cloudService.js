export const imageToString = async (_file) => {
    return new Promise((resolve, reject) => {
        const render = new FileReader();
        render.readAsDataURL(_file);
        render.addEventListener("loadend", async () => {
            resolve(render.result)
        })
    })
}