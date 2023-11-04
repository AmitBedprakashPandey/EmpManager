export default function DeleteArticle() {
  const ImgDelete = async ({ id, imageUrl }) => {
    try {
      await deleteDoc(doc(db, "Articles", id));
      toast("Article deleted successfully", { type: "success" });
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    } catch (error) {
      toast("Error deleting article", { type: "error" });
      console.log(error);
    }
  };
}
