indexing_policy = {
            "indexingMode": "consistent",
            "includedPaths": [{"path": "/*"}],
            "excludedPaths": [{"path": '/"_etag"/?'}],
            "vectorIndexes": [{"path": "/embedding", "type": "diskANN"}],
            "fullTextIndexes": [{"path": "/text"}],
        }
vector_embedding_policy = {
            "vectorEmbeddings": [
                {
                    "path": "/embedding",
                    "dataType": "float32",
                    "distanceFunction": "cosine",
                    "dimensions": 1536,
                }
            ]
        }
full_text_policy = {
            "defaultLanguage": "en-US",
            "fullTextPaths": [{"path": "/text", "language": "en-US"}],
        }
