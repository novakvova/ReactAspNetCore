export const contract = {
    post: {
        name: {
            path: 'post.form.name',
            validation: {
                required: true
            }
        },
        shortDescription: {
            path: 'post.form.shortDescription',
            validation: {
                required: true
            }
        },
        description: {
            path: 'post.form.description',
            validation: {
                required: false
            }
        }
    }
}

