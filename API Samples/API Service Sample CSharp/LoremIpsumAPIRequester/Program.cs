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
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "6103cc5968df4fdebe1a089b9a208f6f");

            // Request parameters
            queryString["length"] = "100";
            queryString["unit"] = "characters";
            queryString["paragraphs"] = "1";
            var uri = "https://acs-apim-demo.azure-api.net/loremipsum/v1/?" + queryString;

            var response = await client.GetAsync(uri);

            Console.WriteLine(response.Content.ReadAsStringAsync().Result);
        }
    }
}