import {defineConfig} from 'tinacms'

const NEXT_PUBLIC_TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const NEXT_PUBLIC_USE_LOCAL_CLIENT =
  process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT || 0;

export default defineConfig({
  branch: "main",
  clientId: NEXT_PUBLIC_TINA_CLIENT_ID,
  isLocalClient: Boolean(Number(NEXT_PUBLIC_USE_LOCAL_CLIENT)),
  mediaStore: async () => (await import('next-tinacms-cloudinary')).TinaCloudCloudinaryMediaStore,
  cmsCallback: (cms) => {
    /**
     * Enables experimental branch switcher
     */
    cms.flags.set("branch-switcher", true)

    cms.flags.set('use-unstable-formify', true)

    import("react-tinacms-editor").then(({MarkdownFieldPlugin}) => {
      cms.plugins.add(MarkdownFieldPlugin);
    });

    /**
     * When `tina-admin` is enabled, this plugin configures contextual editing for collections
     */
    import("tinacms").then(({RouteMappingPlugin}) => {
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        if (["authors", "global"].includes(collection.name)) {
          return undefined;
        }
        if (["pages"].includes(collection.name)) {
          if (document.sys.filename === "home") {
            return `/`;
          }
          if (document.sys.filename === "about") {
            return `/about`;
          }
          return undefined;
        }
        return `/${collection.name}/${document.sys.filename}`;
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
    if (formConfig.id === "getGlobalDocument") {
      return createGlobalForm(formConfig);
    }

    return createForm(formConfig);
  }

  // apiURL,
  // mediaStore: async () => {
  //   const pack = await import("next-tinacms-cloudinary");
  //   return pack.TinaCloudCloudinaryMediaStore;
  // },
  // cmsCallback: (cms) => {
  //   /**
  //    * Enables experimental branch switcher
  //    */
  //   cms.flags.set("branch-switcher", true);
  //
  //   /**
  //    * When `tina-admin` is enabled, this plugin configures contextual editing for collections
  //    */
  //   import("tinacms").then(({ RouteMappingPlugin }) => {
  //     const RouteMapping = new RouteMappingPlugin((collection, document) => {
  //       if (["authors", "global"].includes(collection.name)) {
  //         return undefined;
  //       }
  //       if (["pages"].includes(collection.name)) {
  //         if (document.sys.filename === "home") {
  //           return `/`;
  //         }
  //         if (document.sys.filename === "about") {
  //           return `/about`;
  //         }
  //         return undefined;
  //       }
  //       return `/${collection.name}/${document.sys.filename}`;
  //     });
  //     cms.plugins.add(RouteMapping);
  //   });
  //
  //   return cms;
  // },
  // formifyCallback: ({ formConfig, createForm, createGlobalForm }) => {
  //   if (formConfig.id === "getGlobalDocument") {
  //     return createGlobalForm(formConfig);
  //   }
  //
  //   return createForm(formConfig);
  // },
});