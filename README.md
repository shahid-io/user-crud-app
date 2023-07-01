```
{/_ {previewUrl && (
<img src={previewUrl} alt="Preview" className="profile-img mb-3"/>
)}
{!previewUrl && (
<img
 src={avatar}
alt="Preview"
className="profile-img mb-3"
/>
)} _/}
```

```
/** handle file upload */
  // const handleUpload = async () => {
  //   const file = fileRef.current.files[0];
  //   const uploadRef = ref(storage, file.name);
  //   uploadBytes(uploadRef, file).then(() => {
  //     getDownloadURL(uploadRef).then((res) => {
  //       setProfileUrl(res);
  //     });
  //   });
  // };
  ``
```
