class TaskManagerException(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

class ResourceNotFoundException(TaskManagerException):
    def __init__(self, resource: str, identifier: any):
        super().__init__(f"{resource} with identifier {identifier} not found", 404)

class ValidationException(TaskManagerException):
    def __init__(self, message: str):
        super().__init__(message, 422)
