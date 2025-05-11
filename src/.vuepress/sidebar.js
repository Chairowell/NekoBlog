import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    "/study/": [
        {
            // text: "",
            // icon: "logos:",
            children: "structure",
        }
    ],
    "/study/css/": [
        {
            // text: "CSS",
            // icon: "devicon:css3-wordmark",
            children: "structure",
        }
    ],
    "/study/javascript/": [
        {
            // text: "Javascript",
            // icon: "logos:javascript",
            children: "structure",
        }
    ],
    "/study/vue/": [
        {
            // text: "Vue",
            // icon: "logos:vue",
            children: "structure",
        }
    ],
    "/study/graphql/": [
        {
            // text: GraphQL",
            // icon: "logos:graphql",
            children: "structure",
        }
    ],
});
