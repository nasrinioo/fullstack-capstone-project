curl -s -X POST http://localhost:3060/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"capstone_demo@giftlink.local\",\"password\":\"SecurePass!2026\"}"

{"message":"Login successful","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YTAwZWI3NGRkNjFmOTA4N2E5YmEwNmIiLCJlbWFpbCI6ImNhcHN0b25lX2RlbW9AZ2lmdGxpbmsubG9jYWwiLCJ1c2VybmFtZSI6ImNhcHN0b25lX2RlbW8iLCJpYXQiOjE3Nzg0NDUyMzksImV4cCI6MTc3OTA1MDAzOX0.L6jfD_RTokDkGqVQQdyjXEzdSwLTb6Txv_cx_3ilicE","user":{"_id":"6a00eb74dd61f9087a9ba06b","username":"capstone_demo","email":"capstone_demo@giftlink.local"}}
