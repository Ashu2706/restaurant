export async function fetchMealsByType(type) {
    if (type) {
        try {
            const response = await fetch(`https://dummyjson.com/recipes/meal-type/${type}?limit=6`, {
                method: "GET",
            });
            if (response?.status === 200) {
                const res = await response.json(); //it is also a async task that returns promise of converting res into json
                console.log(res);
                return res;
            }
            else {
                console.log(response);
                return null;
            }

        } catch (error) {
            console.log(error?.message);
            return null;
        }
    }
}

