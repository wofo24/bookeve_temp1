// Check if the referrer is set in the HTTP headers
if (document.referrer) {
    const referrer = document.referrer;

    // Check if the referrer contains specific keywords to identify social media platforms
    if (referrer.includes("facebook")) {
        // The user came from Facebook
        console.log("User came from Facebook");
    } else if (referrer.includes("instagram")) {
        // The user came from Instagram
        console.log("User came from Instagram");
    } else if (referrer.includes("whatsapp")) {
        // The user came from WhatsApp
        console.log("User came from WhatsApp");
    } else if (referrer.includes("youtube")) {
        // The user came from YouTube
        console.log("User came from YouTube");
    } else {
        // Referrer is not recognized as a social media platform
        console.log("User came from an unknown source");
    }
} else {
    // No referrer information available
    console.log("Referrer information not available");
}


if (document.referrer && document.referrer.includes("google.com")) {
    console.log("User came from a Google search.");
} else {
    console.log("User did not come from a Google search.");
}
