import axios from "axios";
import { getAllInterestsapi } from "./apis";
import { interests as allInterests } from "../data/interests";

export const getAllInterests = async (tokenData, setInterestArray) => {
  try {
    const response = await axios.get(getAllInterestsapi, {
      headers: {
        Authorization: `Bearer ${tokenData}`,
      },
    });
    const { interests } = response.data;


    // Map through interests and find matches with allInterests
    const matchedInterests = interests.map((interest) => {
      // Find a matching interest from allInterests based on name (case insensitive)
      const matchedInterest = allInterests.find(
        (allInterest) =>
          allInterest?.name?.toLowerCase() === interest?.toLowerCase()
      );

      // If there's a match, return the matched interest data with the new structure
      if (matchedInterest) {
        console.log("Matched Interest:", {
          //   id: matchedInterest.id,
          name: matchedInterest.name,
          iconFile: matchedInterest.iconFile,
          activeIconFile: matchedInterest.activeIconFile,
        });

        // Return the matched interest data
        return {
          //   id: matchedInterest.id,
          name: matchedInterest.name,
          iconFile: matchedInterest.iconFile,
          activeIconFile: matchedInterest.activeIconFile,
        };
      } else {
        // If no match is found, return the interest from the API as-is
        console.log("No match found for:", interest);
        return interest;
      }
    });

    // Set the interest array state with the matched interests
    setInterestArray(matchedInterests);
  } catch (error) {
    console.log("Error fetching interests:", error);
  }
};
