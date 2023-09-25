Firstly, my computer's limitations forced me to use Expo since it couldn't handle emulators properly. Moreover, I run Arch Linux, which had some package issues and other quirks. Overcoming these environmental obstacles was the primary, if not the sole, challenge in this test.

While I'm not entirely satisfied with the code's cleanliness at the moment, I have plans to address this. Tomorrow (I hope so), I'll commit the code cleanup, which includes externalizing the inline CSS, moving the API call for cityData to the service layer, and componentizing certain functionalities.

Approximately 12 hours were dedicated to resolving compatibility problems, while another 6 hours were spent creating screens, implementing functionalities, and studying the documentation for the APIs and libraries used. This also involved diving into expo-cli's extensive content.

I encountered difficulties with the expo-router library, particularly in making navigation work on my phone. Even after downloading an expo template with expo-router, the issue persisted. As a workaround, I decided to conditionally display components on a single screen. Given the simplicity of the application, I considered this approach valid.

One of the enjoyable aspects of this project was working with geolocation, a new experience for me. I had never worked with these geo APIs before.

I had plans to implement a settings screen for selecting themes and region (such as temperature units in Celsius, Kelvin, Fahrenheit, etc.). I also intended to save coordinates in AsyncStorage, enabling a quicker app launch experience.

However, it's worth noting that the chosen API doesn't provide information for past or future days. Consequently, I refrained from making multiple fetch requests to gather data for various days, as it wouldn't have been a comfortable solution.