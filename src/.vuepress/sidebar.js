import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    "/vue/": [
        {
            // text: "Vue",
            // icon: "logos:vue",
            children: "structure",
        }
    ],
    "/graphql/": [
        {
            // text: GraphQL",
            // icon: "logos:graphql",
            children: "structure",
        }
    ],
});
