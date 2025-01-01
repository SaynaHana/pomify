import "./../App.css";

function PrivacyPolicy() {
    return(
        <div className="privacy-policy background">
            <h2 className="sub-header">Privacy Policy</h2>
            <p>Effective Date: January 1st, 2025</p>
            <p>Pomify (“we”, “our”, or “us”) is committed to protecting your privacy. This privacy policy explains how we collect, use, and protect your personal information when you use our web/mobile applications.</p>
            <h3>What Information we Collect</h3>
            <h4>Personal Information</h4>
            <p>We collect the following personal information:</p>
            <ul>
                <li><p>Name</p></li>
                <li><p>Email address</p></li>
                <li><p>Profile picture</p></li>
            </ul>
            <p>All of the above are collected from your public Google profile data if you choose to sign in with Google.</p>
            <h4>Cookies</h4>
            <p>We use Firebase Authentication for user registration, login and for associating app data (such as Pomodoro time tracking and streaks) with users. As such, all of the cookies that are stored are from Firebase. These include short-lived JWT ID tokens which can be used to get the personal information above.</p>
            <h3>How the Information is Used</h3>
            <h4>App Functionality</h4>
            <p>We use your UID from Firebase Authentication to be able to store your app data (such as Pomodoro time tracking and streaks) and later be able to retrieve them so that you can see them in the app. This UID is associated with your public Google profile data when you sign in with Google.</p>
            <h4>Personalization</h4>
            <p>We use your name and Google profile picture to personalize your account. This means the name and profile picture that is on your Google profile will show up in the app.</p>
            <h3>Data Sharing and Disclosure</h3>
            <p>Your data, including personal data, may be transferred to a computer outside of your state, province, country or other governmental jurisdiction for the purpose of changing server locations or to comply with legal obligations. We also use Firebase for authentication and so they will have access to the above information.</p>
            <h3>Data Retention</h3>
            <h4>Retention Period</h4>
            <p>We will keep your information for as long as you have an account with us.</p>
            <h4>Deletion</h4>
            <p>You may request to delete your account by going to the app’s settings and clicking on the delete account button or you may also email aerisiadev@gmail.com to request deletion. This means that all of your personal data and app data will be permanently deleted.</p>
            <h3>Security</h3>
            <p>We take the security of your personal data seriously and we do our best to keep it safe. However, please note that no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute safety.</p>
            <h3>Data Breaches</h3>
            <p>In the event of a data breach, we will notify you through email promptly. We will state when the breach happened and what types of information were compromised.</p>
            <h3>Changes to this Privacy Policy</h3>
            <p>This privacy policy may change over time and we will notify you over email before the change becomes effective and will update the effective date at the top of this privacy policy. Changes are effective when they are posted to this page.</p>
            <h3>Contact</h3>
            <p>If you have any questions, you may contact us at aerisiadev@gmail.com.</p>
        </div>
    );
}

export default PrivacyPolicy;