// handling google authentication..
        async googleAuth(response) {
                // console.log(response)
                console.log("decode credential: ", decodeCredential(response.credential));
                const decoded_user_data = decodeCredential(response.credential);
                console.log(decoded_user_data)
                // const email = decoded_user_data.email;
                // const firstname = decoded_user_data.given_name;
                // const lastname = decoded_user_data.family_name;
                // const googleId = decoded_user_data.sub;
                // const picture = decoded_user_data.picture;
                // try {
                //     const userData = {
                //         email: email,
                //         firstname: firstname,
                //         lastname: lastname,
                //         googleId: googleId,
                //         picture: picture,
                //     }
                //     console.log("user data from google: ", userData)

                //     const response = await axios.post(`http://localhost:8000/api/google-auth`, userData);
                //     localStorage.setItem('life-gaurd', response.data.token);
                //     this.$router.push('/profile');
                //     // console.log(response);

                // }catch(error){
                //     console.log(error)
                // }
        },