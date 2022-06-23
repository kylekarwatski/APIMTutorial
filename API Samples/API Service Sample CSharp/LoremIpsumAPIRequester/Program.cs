using System;
using System.Net.Http;
using System.Web;

namespace LoremIpsumAPIRequester
{
    class Program
    {
        static void Main()
        {
            MakeRequest();
            Console.WriteLine("Hit ENTER to exit...");
            Console.ReadLine();
        }

        static async void MakeRequest()
        {
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "INSERT_KEY_HERE");

            // Request parameters
            queryString["length"] = "100";
            queryString["unit"] = "characters";
            queryString["paragraphs"] = "1";
            var uri = "https://apim-demo-eastus-dev.azure-api.net/loremipsum/v1/?" + queryString;

            var response = await client.GetAsync(uri);

            Console.WriteLine(response.Content.ReadAsStringAsync().Result);
        }
    }
}
