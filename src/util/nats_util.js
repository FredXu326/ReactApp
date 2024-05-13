const sendUpdate = async (subject, token, data) => {
    const formData = {
        subject: subject,
        message: data
    };

    try {
        const response = await fetch('/publish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(formData)
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error(responseData);
            throw new Error(`Failed to publish message: ${JSON.stringify(responseData)}`);
        }

        console.log('Table data published successfully!');
    } catch (error) {
        console.error('Error occurred while submitting table data:', error);
        throw error; // Re-throw error for handling in the component
    }
};

export default sendUpdate;