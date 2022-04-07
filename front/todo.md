Groupomania Front +Groupomania
    User #User
        (A) Security @userOperations @auth {cm:2022-03-21}  {c}
            Login page {cm}
            Signup page {cm:2022-03-19}
            Logout {cm}
            Forgotten password page {cm:2022-03-21}
            Reset password page {cm:2022-03-21}
        User profile pages @userOperations     
            Public page
                Fetch user & display all posts
            Private User page  
                Update user
                Delete user

    Posts #Posts @postsOperations    
        Fetch all posts home page {cm}
        Post card {cm}
        Post Editor {cm}
        Fetch post by id {cm:2022-04-06}
        Create new post
        Update post
        Delete post
        Like/Unlike post {cm:2022-04-06}
        Lazy fetching posts on scroll
        
    Comment #Comments @commentOperations  
        Modal new comment {cm}
        Create new comment 
        Update comment by id
        Delete comment by id
