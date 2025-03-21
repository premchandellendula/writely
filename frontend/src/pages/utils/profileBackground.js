export function profileBackground(username){
    let hash = 0;

    for(let i=0;i<username.length;i++){
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colors = [
        'bg-pink-700', 'bg-blue-700', 'bg-green-700', 'bg-purple-700',
        'bg-yellow-700', 'bg-red-700', 'bg-indigo-700', 'bg-teal-700',
        'bg-orange-700', 'bg-cyan-700'
    ];

    const colorIndex = Math.abs(hash) % colors.length;

    return colors[colorIndex]
}

// console.log(profileBackground("weather"))

