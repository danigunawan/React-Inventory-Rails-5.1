class Paginates::PaginatedContainersController < ApplicationController
  def index
    @paginator = ResultsPaginator.new(Container.all, current_page: params[:current_page])
    render json: {containers: @paginator.paginated_results, active_page: @paginator.get_current_page}
  end
end
