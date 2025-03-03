// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!




//select forms
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');


//------------------------------------------------------------------------------------


//show errors
const showError = (hold, text) => {
    const ee = document.createElement('div');
    ee.className = 'error-message';
    ee.textContent = text;
    hold.parentNode.appendChild(ee);
};




//get rid of errors message
const noError = (hold) => {
    const em = hold.parentNode.querySelectorAll('.error-message');
    em.forEach(text => text.remove());
};


//------------------------------------------------------------------------------------


//make sure registration is valid
const goodReg = () => {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const emailAddress = document.getElementById('emailAddress');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const role = document.getElementById('role');


    //get rid of error messages
    [firstName, lastName, emailAddress, password, confirmPassword, role].forEach(hold => {
        noError(hold);
    });


//ensure no fields are left empty
if (!firstName.value.trim() || !lastName.value.trim() || !emailAddress.value.trim() || !password.value || !confirmPassword.value || !role.value) {
    showError(firstName, 'First name required!');
    showError(lastName, 'Last name required!');
    showError(emailAddress, 'Email required!');
    showError(password, 'Password required!');
    showError(confirmPassword, 'Confirm Password required!');
    showError(role, 'Role required!');
    return false;
}


//passwords and confirm password must match
if (password.value !== confirmPassword.value) {
    showError(confirmPassword, 'Passwords do not match!');
    return false;
}
//otherwise
return true;
};


//------------------------------------------------------------------------------------


//make sure login is valid
const goodLogin = () => {
    const emailAddress = document.getElementById('loginEmailAddress');
    const password = document.getElementById('loginPassword');


    //get rid of error messages
    [emailAddress, password].forEach(hold => {
        noError(hold);
    });


//ensure no fields are left empty
if (!emailAddress.value.trim() || !password.value) {
    showError(emailAddress, 'Email address required');
    showError(password, 'Password required');
    return false;
}


return true;
}


//------------------------------------------------------------------------------------


//event listener for registration form
if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();


        //validate
        if (goodReg()) {
            registerForm.submit();
        }
    });
}


//event listener for login form
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();


        //validate
        if (goodLogin()) {
            loginForm.submit();
        }
    });
}

//---------------------------------new

// document.addEventListener('DOMContentLoaded', function() {
//     const submitButton = document.getElementById('submit-button');
//     if (submitButton) {
//         submitButton.addEventListener('click', function() {
//             submitReview();
//         });
//     }
// });
// function submitReview(businessId) {
//     console.log('submitReview function called')
//     const title = document.getElementById('review-title').value;
//     const reviewerName = document.getElementById('reviewer-name').value;
//     const review = document.getElementById('review-text').value;
//     const rating = document.getElementById('rating').value;

//     console.log('review data:', { title, reviewerName, review, rating})

//     const data = {
//         title: title,
//         reviewerName: reviewerName,
//         review: review,
//         rating: parseFloat(rating)
//     };
// fetch(`/businesses/${businessId}/reviews`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to submit review');
//         }
        
//         console.log('Review submitted successfully');
//         return response.json();
//     })
// .then(review => {
//         const reviewHtml = `
//         <div class="review">
//             <h3>Title: ${title}</h3>
//             <p>Reviewer: ${reviewerName}</p>
//             <p>Rating: ${parseFloat(rating)}</p>
//             <p>Review: ${review}</p>
//         </div>
//         `;
//         const reviewsContainer = document.getElementById('reviews-container');
//         reviewsContainer.insertAdjacentHTML('beforeend', reviewHtml);
//         console.log('Review submitted successfully');
//     })
//     .catch(error => {
        
//         console.error('Error submitting review:', error.message);
//     });
// }
// function renderReviews(reviews) {
//     const reviewsContainer = document.getElementById('reviews-container');
// console.log('received reviews:', reviews)
    
//     reviewsContainer.innerHTML = '';

//     reviews.forEach(review => {
//         const reviewHtml = `
//             <div class="review">
//                 <h3>${review.title}</h3>
//                 <p>Reviewer: ${review.reviewerName}</p>
//                 <p>Rating: ${parseFloat(review.rating)}</p>
//                 <p>${review.review}</p>
//             </div>
//         `;
//         console.log(reviewHtml)
//         reviewsContainer.insertAdjacentHTML('beforeend', reviewHtml);
//     });
// }
// const urlParams = new URLSearchParams(window.location.search);
// const businessId = urlParams.get('id');


// async function fetchReviews(businessId) {
//     try {
//         if (!businessId) {
//             throw new Error('Invalid businessId:', businessId);
//         }
    
//         const response = await fetch(`/businesses/${businessId}/reviews`)
//             if (!response.ok) {
//                     throw new Error('Failed to fetch reviews');
//                 }
//             const reviews = await response.json();
//             renderReviews(reviews);
//         } catch (error) {
//                 console.error('Error fetching reviews:', error.message);
//         }
// }
// document.getElementById('delete-form').addEventListener('submit', async (event) => {
//     event.preventDefault(); 
// console.log('button clicked')
//     const formData = new FormData(event.target); 
//     const businessName = formData.get('businessName'); 

//     try {
//         const response = await fetch('/businesses', {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ businessName }) 
//         });

//         if (!response.ok) {
//             throw new Error('Failed to delete business');
//         }
//         const responseData = await response.json();
//         const message = responseData.message;
//         alert(message);
        
//     } catch (error) {
//         console.error('Error:', error.message);
       
//     }
// });