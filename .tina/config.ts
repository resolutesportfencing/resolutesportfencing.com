import { defineConfig } from 'tinacms'
import schema from './schema'

const branch = "main";
const apiURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;


export default defineConfig({
  branch: "main",
  schema,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  isLocalClient: Boolean(Number(process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT)),
  apiURL,
  cmsCallback: (cms) => {
    /**
     * Enables experimental branch switcher
     */
    cms.flags.set("branch-switcher", true)

    // cms.flags.set('use-unstable-formify', true)

    // import("react-tinacms-editor").then(({MarkdownFieldPlugin}) => {
    //   cms.plugins.add(MarkdownFieldPlugin);
    // });

    /**
     * When `tina-admin` is enabled, this plugin configures contextual editing for collections
     */
    import("tinacms").then(({RouteMappingPlugin}) => {
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        if (["authors", "global"].includes(collection.name)) {
          return undefined;
        }
        if (["pages"].includes(collection.name)) {
          if (document._sys.filename === "home") {
            return `/`;
          }
          if (document._sys.filename === "about") {
            return `/about`;
          }
          return undefined;
        }
        return `/${collection.name}/${document._sys.filename}`;
      });
      cms.plugins.add(RouteMapping);
    });

    return cms
  },
  documentCreatorCallback: {
    /**
     * After a new document is created, redirect to its location
     */
    onNewDocument: ({collection: {slug}, breadcrumbs}) => {
      const relativeUrl = `/${slug}/${breadcrumbs.join("/")}`;
      return (window.location.href = relativeUrl);
    },
    /**
     * Only allows documents to be created to the `Blog Posts` Collection
     */
    filterCollections: (options) => {
      return options.filter(
        (option) => option.label === "Blog Posts"
      );
    },
  },
  /**
   * Treat the Global collection as a global form
   */
  formifyCallback: ({formConfig, createForm, createGlobalForm}) => {
    if (formConfig.id === "content/global/index.json") {
      return createGlobalForm(formConfig);
    }

    return createForm(formConfig);
  }
});