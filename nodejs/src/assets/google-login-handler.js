function save_g_csrf_token(x) {
    document.cookie = `g_csrf_token=${x.credential};max-age=300`;
}
