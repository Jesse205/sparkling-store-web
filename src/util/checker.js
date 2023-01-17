
export function checkJsonAndToast(store, data) {
    if (data==null || data.code != 200) {
        // store.showSnackBar(`${data.msg || 'Unknown error'} (${data.code})`)
    }
}