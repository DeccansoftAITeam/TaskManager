import apiFetch from "./api";

export const commentService = {
  getByTask: async (taskId) => {
    return apiFetch(`/task/comments/${taskId}`);
  },
  add: async (taskId, username, commentText) => {
    return apiFetch("/task/comment/add", {
      method: "POST",
      body: JSON.stringify({
        task_id: taskId,
        username: username,
        comment_text: commentText,
      }),
    });
  },
};
