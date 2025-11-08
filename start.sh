#!bin/bash
GREEN='\033[1;32m'
BLUE='\033[0;34m'
while : 
do
printf "${BLUE}︎YUNO 𝐁𝐎𝐓 𝐂𝐎𝐍𝐄𝐂𝐓𝐀𝐍𝐃𝐎, 𝐀𝐆𝐔𝐀𝐑𝐃𝐄\n"
if [ "$1" = "sim" ]; then
node connect.js sim
elif [ "$1" = "não" ]; then
node connect.js não
else 
node connect.js
fi
sleep 1 
printf "${GREEN}『 YUNO 𝐁𝐎𝐓 』𝐈𝐍𝐈𝐂𝐈𝐀𝐍𝐃𝐎 𝐎 𝐏𝐑𝐎𝐆𝐄𝐓𝐎 𝐍𝐎𝐕𝐀𝐌𝐄𝐍𝐓𝐄\n"
done
