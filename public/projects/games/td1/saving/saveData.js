function saveUserData(){
    const userData = {
        playerdata:window.playerdata

    };
    
    localStorage.setItem('userData', obfuscateData(userData));
}
function loadUserData() {
    const userData = localStorage.getItem('userData');
    if (userData) {
 
        const parsedData = unobfuscateData(userData);
        console.log(parsedData)
        window.playerdata = parsedData.playerdata;
    }
}
setTimeout(() => {
loadUserData();
},100)
window.addEventListener('beforeunload', saveUserData);
window.saveUserData = saveUserData;
