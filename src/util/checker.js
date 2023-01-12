
export function checkJsonAndToast(store, data) {
    if (data && data.code != 200) {
        store.showSnackBar(`${data.msg || 'Unknown error'} (${data.code})`)
    }
}